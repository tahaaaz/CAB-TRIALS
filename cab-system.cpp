#include<bits/stdc++.h>
using namespace std;
#define ll long long

int main()
{

    cout << "###################################### WELCOME TO OUR CAB ASSIGNING PLATFORM ######################################\n" << endl;

    map<int, queue<pair<string, ll>>> seatmap;

    map<int, queue<pair<string, ll>>> vacantm;

    map<int, queue<pair<string, ll>>> aseatmap;

    map<int, queue<pair<string, ll>>> avacantm;

    map<int, queue<pair<string, ll>>> seatmap2;

    map<int, queue<pair<string, ll>>> vacantm2;

    map<int, queue<pair<string, ll>>> aseatmap2;

    map<int, queue<pair<string, ll>>> avacantm2;

    while (true)
    {

    cout<<"Select 1 for 62->128 "<<endl;
    cout<<"Select 2 for 128->62 "<<endl;
    cout<<endl;

    int mch; cin>>mch;

    // 62->128
    if(mch==1)
    {
        int ch, time;

        string name;

        ll cn, number;

        string tname;

        ll tnum;

        cout << "Menu:\n";

        cout<<endl;

        cout << "1. Add request for a vacant seat in a cab " << endl;

        cout << "2. Add request for a vacant seat in an auto " << endl;

        cout << "3. Add request for a seat needed in a cab " << endl;

        cout << "4. Add request for a seat needed in an auto " << endl;

        cout << "5. Exit" << endl;

        cout<<endl;

        cout << "Enter your choice: ";

        cin >> ch;

        cout << endl;

        if (ch == 5)
        {
            cout << "Thank you for using our cab assigning platform. Goodbye!" << endl;
            break;
        }

        // Requesting a seat
        else if (ch == 3)
        {

            cout << "Enter your name: ";

            cin >> name;

            cout << "Enter your desired time slot: ";

            cin >> time;

            cout << "Enter your contact number: ";

            cin >> cn;

            cout << endl;

            seatmap[time].push(make_pair(name, cn));


            if (!vacantm[time].empty())
            {
                tname = vacantm[time].front().first;

                tnum = vacantm[time].front().second;

                vacantm[time].pop();

                seatmap[time].pop();

                cout << "Great news! " << name << ", you have been assigned to a cab group with " << tname << " (" << tnum << ")" << endl;
            }


            else if (seatmap[time].size() == 4)

            {
                queue<pair<string, ll>> tempq = seatmap[time];


                while (!seatmap[time].empty())
                {
                    seatmap[time].pop();
                }

                cout << "Congratulations! A group has been formed for the time slot " << time << ":" << endl;

                while (!tempq.empty())
                {
                    name = tempq.front().first;

                    number = tempq.front().second;

                    tempq.pop();

                    cout << name << " - " << number << endl;
                }
                cout << endl;
            }

            else
            {
                cout << "Thank you, " << name << ". Your request has been saved. We will notify you once your group is formed." << endl;
            }
        }


        else if ( ch==4 )
        {
            cout << "Enter your name: ";

            cin >> name;

            cout << "Enter your desired time slot: ";

            cin >> time;

            cout << "Enter your contact number: ";

            cin >> cn;

            cout << endl;

            aseatmap[time].push(make_pair(name, cn));


            if (!avacantm[time].empty())
            {
                tname = avacantm[time].front().first;

                tnum = avacantm[time].front().second;

                avacantm[time].pop();

                aseatmap[time].pop();

                cout << "Great news! " << name << ", you have been assigned to an auto group with " << tname << " (" << tnum << ")" << endl;
            }


            else if (aseatmap[time].size() == 3)

            {
                queue<pair<string, ll>> tempq = aseatmap[time];


                while (!aseatmap[time].empty())
                {

                    aseatmap[time].pop();
                }

                cout << "Congratulations! A group has been formed for the time slot " << time << ":" << endl;

                while (!tempq.empty())
                {
                    name = tempq.front().first;

                    number = tempq.front().second;

                    tempq.pop();

                    cout << name << " - " << number << endl;

                }

                cout << endl;
            }

            else
            {
                cout << "Thank you, " << name << ". Your request has been saved. We will notify you once your group is formed." << endl;
            }
        }


        else if (ch == 1)
            {

            cout << "Enter your name: ";

            cin >> name;

            cout << "Enter the time slot you have a vacant seat for: ";

            cin >> time;

            cout << "Enter your contact number: ";

            cin >> cn;

            cout << endl;


            if (!seatmap[time].empty())
            {

                queue<pair<string, ll>> tempq = seatmap[time];

                seatmap[time].pop();

                cout << "Success! " << name << ", a passenger has been assigned to your cab group:" << endl;

                cout << tempq.front().first << " - " << tempq.front().second << endl;

            }

            else
            {
                cout << "Your request has been saved, " << name << ". We will notify you as soon as a passenger is found." << endl;

                vacantm[time].push(make_pair(name, cn));
            }
        }



        else if (ch == 2)
            {

            cout << "Enter your name: ";

            cin >> name;

            cout << "Enter the time slot you have a vacant seat for: ";

            cin >> time;

            cout << "Enter your contact number: ";

            cin >> cn;

            cout << endl;


            if (!aseatmap[time].empty())
            {

                queue<pair<string, ll>> tempq = aseatmap[time];

                aseatmap[time].pop();

                cout << "Success! " << name << ", a passenger has been assigned to your auto group:" << endl;

                cout << tempq.front().first << " - " << tempq.front().second << endl;

            }

            else
            {
                cout << "Your request has been saved, " << name << ". We will notify you as soon as a passenger is found." << endl;

                avacantm[time].push(make_pair(name, cn));
            }
        }

        else
        {
            cout << "Invalid choice! Please enter a valid option." << endl;
        }

    }

    // 128-62
    else
        {

        int ch, time;

        string name;

        ll cn, number;

        string tname;

        ll tnum;

        cout << "Menu:\n";

        cout<<endl;

        cout << "1. Add request for a vacant seat in a cab " << endl;

        cout << "2. Add request for a vacant seat in an auto " << endl;

        cout << "3. Add request for a seat needed in a cab " << endl;

        cout << "4. Add request for a seat needed in an auto " << endl;

        cout << "5. Exit" << endl;

        cout<<endl;

        cout << "Enter your choice: ";

        cin >> ch;

        cout << endl;

        if (ch == 5)
        {
            cout << "Thank you for using our cab assigning platform. Goodbye!" << endl;
            break;
        }

        // Requesting a seat
        else if (ch == 3)
        {

            cout << "Enter your name: ";

            cin >> name;

            cout << "Enter your desired time slot: ";

            cin >> time;

            cout << "Enter your contact number: ";

            cin >> cn;

            cout << endl;

            seatmap2[time].push(make_pair(name, cn));


            if (!vacantm2[time].empty())
            {
                tname = vacantm2[time].front().first;

                tnum = vacantm2[time].front().second;

                vacantm2[time].pop();

                seatmap2[time].pop();

                cout << "Great news! " << name << ", you have been assigned to a cab group with " << tname << " (" << tnum << ")" << endl;
            }


            else if (seatmap2[time].size() == 4)

            {
                queue<pair<string, ll>> tempq = seatmap2[time];


                while (!seatmap2[time].empty())
                {
                    seatmap2[time].pop();
                }

                cout << "Congratulations! A group has been formed for the time slot " << time << ":" << endl;

                while (!tempq.empty())
                {
                    name = tempq.front().first;

                    number = tempq.front().second;

                    tempq.pop();

                    cout << name << " - " << number << endl;
                }
                cout << endl;
            }

            else
            {
                cout << "Thank you, " << name << ". Your request has been saved. We will notify you once your group is formed." << endl;
            }
        }


        else if ( ch==4 )
        {
            cout << "Enter your name: ";

            cin >> name;

            cout << "Enter your desired time slot: ";

            cin >> time;

            cout << "Enter your contact number: ";

            cin >> cn;

            cout << endl;

            aseatmap2[time].push(make_pair(name, cn));


            if (!avacantm2[time].empty())
            {
                tname = avacantm2[time].front().first;

                tnum = avacantm2[time].front().second;

                avacantm2[time].pop();

                aseatmap2[time].pop();

                cout << "Great news! " << name << ", you have been assigned to an auto group with " << tname << " (" << tnum << ")" << endl;
            }


            else if (aseatmap2[time].size() == 3)

            {
                queue<pair<string, ll>> tempq = aseatmap2[time];


                while (!aseatmap2[time].empty())
                {

                    aseatmap2[time].pop();
                }

                cout << "Congratulations! A group has been formed for the time slot " << time << ":" << endl;

                while (!tempq.empty())
                {
                    name = tempq.front().first;

                    number = tempq.front().second;

                    tempq.pop();

                    cout << name << " - " << number << endl;

                }

                cout << endl;
            }

            else
            {
                cout << "Thank you, " << name << ". Your request has been saved. We will notify you once your group is formed." << endl;
            }
        }


        else if (ch == 1)
            {

            cout << "Enter your name: ";

            cin >> name;

            cout << "Enter the time slot you have a vacant seat for: ";

            cin >> time;

            cout << "Enter your contact number: ";

            cin >> cn;

            cout << endl;


            if (!seatmap2[time].empty())
            {

                queue<pair<string, ll>> tempq = seatmap[time];

                seatmap2[time].pop();

                cout << "Success! " << name << ", a passenger has been assigned to your cab group:" << endl;

                cout << tempq.front().first << " - " << tempq.front().second << endl;

            }

            else
            {
                cout << "Your request has been saved, " << name << ". We will notify you as soon as a passenger is found." << endl;

                vacantm2[time].push(make_pair(name, cn));
            }
        }



        else if (ch == 2)
            {

            cout << "Enter your name: ";

            cin >> name;

            cout << "Enter the time slot you have a vacant seat for: ";

            cin >> time;

            cout << "Enter your contact number: ";

            cin >> cn;

            cout << endl;


            if (!aseatmap2[time].empty())
            {

                queue<pair<string, ll>> tempq = aseatmap2[time];

                aseatmap2[time].pop();

                cout << "Success! " << name << ", a passenger has been assigned to your auto group:" << endl;

                cout << tempq.front().first << " - " << tempq.front().second << endl;

            }

            else
            {
                cout << "Your request has been saved, " << name << ". We will notify you as soon as a passenger is found." << endl;

                avacantm2[time].push(make_pair(name, cn));
            }
        }

        else
        {
            cout << "Invalid choice! Please enter a valid option." << endl;
        }

        }

    }

    return 0;
}
